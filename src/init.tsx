import { withApollo } from "../lib/apollo";
import Entry from "./entry";
import { NextPage } from "next";

export function init<P = {}, IP = P>(Component: NextPage<P, IP>) {
  const Initializer = (props: P) => {
    return (
      <Entry>
        <Component {...props} />
      </Entry>
    );
  };

  Initializer.getInitialProps = Component.getInitialProps;
  return withApollo({ ssr: true })(Initializer);
}

export default init;
