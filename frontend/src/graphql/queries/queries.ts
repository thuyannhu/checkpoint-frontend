import { gql } from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
	query Countries {
		countries {
			code
			emoji
			id
			name
			continent {
				id
				name
			}
		}
	}
`;

export const GET_COUNTRY_BY_CODE = gql`
	query country($code: String!) {
		country(code: $code) {
			code
			continent {
				id
				name
			}
			emoji
			id
			name
		}
	}
`;

export const GET_ALL_CONTINENTS = gql`
	query Continents {
		continents {
			id
			name
		}
	}
`