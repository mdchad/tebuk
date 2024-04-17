"use client";

import {Button} from "@/components/ui/button";

const Main = ({ refetch }: any) => {
  return (
    <Button onClick={() => refetch()}>Randomise</Button>
  );
};

export default Main;