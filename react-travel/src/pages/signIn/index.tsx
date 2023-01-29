import React from "react";
import { UserLayout } from "../../layouts/user";
import { SignInForm } from "./signInForm";

export const SignIn: React.FC = () => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};
