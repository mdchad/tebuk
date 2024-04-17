"use client";

import { useQuery } from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {getData} from "@/app/store";
import {useState} from "react";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const Main = ({ refetch }) => {
  return (
    <Button onClick={() => refetch()}>Randomise</Button>
  );
};

export default Main;