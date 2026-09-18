"use client";

import { useEffect } from "react";
import api from "@/services/axios";

const ServerWarmup = () => {
  useEffect(() => {
    api.get("/health").catch(() => {});
  }, []);

  return null;
};

export default ServerWarmup;
