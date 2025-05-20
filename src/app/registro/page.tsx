"use client";
import { useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  BuildingOffice2Icon,
  PhoneIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterForm } from "@/components/registro-form";

type Usuario = {
  _id: string;
  fullname?: string;
  role?: string;
  departamento_id?: string;
};
export default function RegisterPage() {
  return <RegisterForm />;

}
