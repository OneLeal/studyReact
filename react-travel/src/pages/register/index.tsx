import React from "react";
import { RegisterForm } from "./registerForm";
import { UserLayout } from "../../layouts/user";

export const Register: React.FC = () => {
  return (
    <UserLayout>
      <RegisterForm />
    </UserLayout>
  );
};
