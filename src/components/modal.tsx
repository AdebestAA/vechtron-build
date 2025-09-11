"use client";

import { useModalStore } from "@/app/store/zustand-stores/useModelStore";


const Modal = () => {
    const { closeModal, modalState } = useModalStore();


    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${modalState.openModal ? "bg-black/50 opacity-100 block" : "opacity-0 hidden"
            }`}>
            <div
                className={`bg-background gap-y-6 rounded-lg shadow-xl w-[90%] md:w-[50%] lg:w-[25%] w-full mx-4 px-6 py-6  transform transition-all duration-300 ${modalState.openModal ? "scale-100 opacity-100" : "scale-95 opacity-0 "
                    }`}
            >

                {/* Content */}
                <div className="text-center ">{modalState.content}</div>
                {/* Close Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={closeModal}
                        className="bg-primary  px-6 py-2 cursor-pointer rounded-lg"
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
