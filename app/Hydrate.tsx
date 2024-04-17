"use client";
import React from "react";
import {HydrationBoundary} from "@tanstack/react-query";

function HydrateComp(props: any) {
  return <HydrationBoundary {...props} />;
}

export default HydrateComp;