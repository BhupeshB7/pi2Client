import React, { useState } from "react";

const FAQSection = () => {
  const [openFaq1, setOpenFaq1] = useState(false);
  const [openFaq2, setOpenFaq2] = useState(false);
  const [openFaq3, setOpenFaq3] = useState(false);
  const [openFaq4, setOpenFaq4] = useState(false);
  const [openFaq5, setOpenFaq5] = useState(false);

  return (
    <section className="relative z-20 overflow-hidden bg-dark dark:bg-dark pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <h2 className="text-white dark:text-white mb-4 text-3xl font-bold sm:text-[40px]/[48px]">
                FAQ
              </h2>
              <p className="text-white text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 lg:p-4 lg:pl-4 lg:pr-4 xl:p-4 xl:pl-4 xl:pr-4">
            <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
              <button
                className="flex w-full text-left faq-btn"
                onClick={() => setOpenFaq1(!openFaq1)}
              >
                <div className="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                  <svg
                    className={openFaq1 ? "rotate-180" : ""}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
                    How can i play the color prediction game?
                  </h4>
                </div>
              </button>
              {openFaq1 && (
                <div className="faq-content pl-[62px]">
                  <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                    To play the color prediction games, you need to create an
                    account and deposit a certain amount. Once your account is
                    funded, you can start predicting the colors and potentially
                    win rewards based on your predictions.
                  </p>
                </div>
              )}
            </div>
            {/* FAQ 2 */}
            <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
              <button
                className="flex w-full text-left faq-btn"
                onClick={() => setOpenFaq2(!openFaq2)}
              >
                <div className="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                  <svg
                    className={openFaq2 ? "rotate-180" : ""}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
                   is th website safe and secure?
                  </h4>
                </div>
              </button>
              {openFaq2 && (
                <div className="faq-content pl-[62px]">
                  <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Yes, we prioritize the safety and security of our users. We use encryption to protect your personal and financial information, and we have measures in place to ensure fair gameplay.
                  </p>
                </div>
              )}
            </div>
            {/* FAQ 3 */}
            <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
              <button
                className="flex w-full text-left faq-btn"
                onClick={() => setOpenFaq3(!openFaq3)}
              >
                <div className="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                  <svg
                    className={openFaq3 ? "rotate-180" : ""}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
                    Why joined powerfull India-2 ? it is trustable or not.
                  </h4>
                </div>
              </button>
              {openFaq3 && (
                <div className="faq-content pl-[62px]">
                  <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                  PowerFul India is 100% genuine platform , where you can earn by watching video daily.
                  </p>
                </div>
              )}
            </div>
            {/* FAQ 4 */}
            <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
              <button
                className="flex w-full text-left faq-btn"
                onClick={() => setOpenFaq4(!openFaq4)}
              >
                <div className="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                  <svg
                    className={openFaq4 ? "rotate-180" : ""}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
                    can i withdraw without any direct?
                  </h4>
                </div>
              </button>
              {openFaq4 && (
                <div className="faq-content pl-[62px]">
                  <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                  yes, you can withdraw 400 without any direct.
                  Note: only one time
                  </p>
                </div>
              )}
            </div>
            {/* FAQ 5 */}
            <div className="w-full p-4 mb-8 bg-white rounded-lg shadow-[0px_20px_95px_0px_rgba(201,203,204,0.30)] dark:shadow-[0px_20px_95px_0px_rgba(0,0,0,0.30)] dark:bg-dark-2 sm:p-8 lg:px-6 xl:px-8">
              <button
                className="flex w-full text-left faq-btn"
                onClick={() => setOpenFaq5(!openFaq5)}
              >
                <div className="bg-primary/5 dark:bg-white/5 text-primary mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg">
                  <svg
                    className={openFaq5 ? "rotate-180" : ""}
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 15.675C10.7937 15.675 10.6219 15.6062 10.45 15.4687L2.54374 7.69998C2.23436 7.3906 2.23436 6.90935 2.54374 6.59998C2.85311 6.2906 3.33436 6.2906 3.64374 6.59998L11 13.7844L18.3562 6.53123C18.6656 6.22185 19.1469 6.22185 19.4562 6.53123C19.7656 6.8406 19.7656 7.32185 19.4562 7.63123L11.55 15.4C11.3781 15.5719 11.2062 15.675 11 15.675Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h4 className="mt-1 text-lg font-semibold text-dark dark:text-white">
                   What is the minimum direct to make withdrawal
                  </h4>
                </div>
              </button>
              {openFaq5 && (
                <div className="faq-content pl-[62px]">
                  <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
                   in powerfull India -2 you have to make minimum two direct for withdraw the amount.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3056D3" stopOpacity="0.36" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0" />
              <stop offset="1" stopColor="#F5F2FD" stopOpacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default FAQSection;
