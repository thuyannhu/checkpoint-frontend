import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "@/graphql/queries/queries";
import { useRouter } from "next/router";

export type CountryData = {
	country: {
		id: number;
		code: string;
		emoji: string;
		name: string;
		continent: {
			id: number;
			name: string;
		};
	};
};

const Country = () => {
	const router = useRouter();
	const { loading, error, data } = useQuery<CountryData>(GET_COUNTRY_BY_CODE, {
		variables: { code: router.query.code },
	});

	if (loading) return <p>Loading country...</p>;
	if (error) return <p>Error fetching country: {error.message}</p>;

	return (
			<div className="country">
				<span className="emoji">{data?.country.emoji}</span>

				<span className="name">Name : {data?.country.name}</span>

				<span className="continent">
					Continent : {data?.country.continent.name}
				</span>
			</div>
	);
};

export default Country;
