import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ADD_COUNTRY } from "@/graphql/mutations/mutations";
import { GET_ALL_COUNTRIES, GET_ALL_CONTINENTS } from "@/graphql/queries/queries";
import { Continent } from "../../../../backend/src/entities/Continent";

export type CountryInput = {
  id?: number;
  name?: string;
  emoji?: string;
  code?: string;
};

const NewCountry = () => {

  const { register, handleSubmit, reset } = useForm<CountryInput>();

  const [addCountry] = useMutation(ADD_COUNTRY);

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

  return (
    <div>
      <h2>Ajouter un pays</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Nom: <br />
          <input className="text-field" {...register("name")} />
        </label>
        <br />
        <label>
          Emoji: <br />
          <input className="text-field" {...register("emoji")} />
        </label>
        <br />
        <label>
          Code: <br />
          <input className="text-field" {...register("code")} />
        </label>
        <br />
        <br />
        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default NewCountry;