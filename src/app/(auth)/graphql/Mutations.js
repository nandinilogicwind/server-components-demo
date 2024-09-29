import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation emailPasswordLogIn($data: EmailPasswordLogInData!) {
    emailPasswordLogIn(data: $data) {
      message
      data {
        token
        refreshToken
        user {
          email
          profileImage
          name
          firstName
          lastName
        }
      }
    }
  }
`;