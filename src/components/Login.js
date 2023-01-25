import { signIn } from "next-auth/react";
import React from "react";

function Login({ provider }) {
  return (
    <div className="flex justify-center items-center py-[90px]">
      <div className="text-white">
        {Object.values(provider).map((auth) => (
          <div key={auth.name}>
            <button
              onClick={() => signIn(auth.id, { callbackUrl: "/" })}
              className="border p-3 text-[18px] outline-none transition font-semibold hover:bg-[#5A6A90] hover:border-[#5A6A90]"
            >
              Sign in with {auth.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
