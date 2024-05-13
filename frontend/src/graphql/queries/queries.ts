import { gql } from "@apollo/client";

export const GET_ALL_COUNTRIES = gql`
	query Countries {
		countries {
			code
			emoji
			id
			name
		}
	}
`

export const GET_ALL_CONTINENTS = gql`
	query Continents {
		continents {
			id
			name
		}
	}
`