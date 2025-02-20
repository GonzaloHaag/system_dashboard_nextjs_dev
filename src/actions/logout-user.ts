'use server';

import { signOut } from "@/auth.config";

export const LogoutUser = async () => {

    await signOut();

}