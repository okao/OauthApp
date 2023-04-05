import React, { useState, memo } from "react";

const AuthLayout = ({ children }) => {
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="grid items-center justify-content-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-16 h-16 mx-auto" src="/img/logo.svg" alt="logo" />
          <span>Maldives Islamic Bank</span>
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default memo(AuthLayout);
