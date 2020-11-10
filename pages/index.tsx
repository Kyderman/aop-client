import { useContext, useState } from "react";
import * as Firebase from "firebase/app";
import { Button } from "@material-ui/core";
import { FirebaseContext } from "./_app";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import ValidateUserQueryGQL from "../src/queries/validate-user-query.gql";
import TestSubscriptionGQL from "../src/subscriptions/TestSubscription.gql";
import init from "../src/init";

const IndexPage = init(() => {
  const firebase = useContext(FirebaseContext);

  const client = useApolloClient();

  const [currentUser, setCurrentUser] = useState(null);

  const { data, error, loading } = useSubscription(TestSubscriptionGQL, {
    skip: !currentUser,
  });

  console.log(data);

  if (error) {
    return null;
  }

  async function handleGoogleLogin() {
    try {
      const provider = new Firebase.auth.GoogleAuthProvider();

      const result = await firebase.auth().signInWithPopup(provider);

      const token = (await result.user?.getIdToken()) || "";

      localStorage.setItem("auth-token", token);

      const { data, errors } = await client.query({
        query: ValidateUserQueryGQL,
        variables: { idToken: token },
      });

      setCurrentUser(data.validateUser._id);
    } catch (err) {}
  }
  return <Button onClick={handleGoogleLogin}>Button</Button>;
});

export default IndexPage;
