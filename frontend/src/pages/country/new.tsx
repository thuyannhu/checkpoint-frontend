import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ADD_COUNTRY } from "@/graphql/mutations/mutations";
import { GET_ALL_COUNTRIES } from "@/graphql/queries/queries";

export type CountryInput = {
  id?: number;
  name?: string;
  emoji?: string;
  code?: string;
};

const NewCountry = () => {
  const { register, handleSubmit, reset } = useForm<CountryInput>();
  const [addCountry] = useMutation(ADD_COUNTRY);
	const { loading, error, data } = useQuery<{
		countries: {
			id: number;
			code: string;
      emoji: string;
      name: string;
		}[];
	}>(GET_ALL_COUNTRIES);
    const onSubmit: SubmitHandler<CountryInput> = async (formData: CountryInput) => {
    try {
      await addCountry({
				variables: {
					data: {
						name: formData.name,
						emoji: formData.emoji,
						code: formData.code,
					},
				},
			});
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  console.log(data)
 return (
		<>
			<div className="card">
				<form className="form-flex" onSubmit={handleSubmit(onSubmit)}>
					<label>
						Name <br />
						<input className="text-field" {...register("name")} />
					</label>
					<br />
					<label>
						Emoji <br />
						<input className="text-field" {...register("emoji")} />
					</label>
					<br />
					<label>
						Code <br />
						<input className="text-field" {...register("code")} />
					</label>
					<br />
					<br />
					<input className="button" type="submit" />
				</form>
			</div>
			{loading ? (
				<p>Loading countries...</p>
			) : error ? (
				<p>Error fetching countries: {error.message}</p>
			) : (
				<div className="country-cards">
					{data?.countries?.map((country: CountryInput) => (
						<div key={country.id} className="country-card">
							<span className="emoji">{country.emoji}</span>

							<span className="name">{country.name}</span>
						</div>
					))}
				</div>
			)}
		</>
 );
};


export default NewCountry;