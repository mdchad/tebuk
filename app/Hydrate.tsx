"use client";
import React from "react";
import {HydrationBoundary} from "@tanstack/react-query";

function HydrateComp(props) {
  return <HydrationBoundary {...props} />;
}

export default HydrateComp;