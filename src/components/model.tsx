
export default function Modal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[300px] mx-4">
                {/* Header */}
                <div className="px-6 pb-4 border-b">
                    <h2 className="text-lg font-semibold">Modal Title</h2>
                </div>

                {/* Content */}
                <div className="px-6 py-2">
                    <p className="text-gray-700">
                        This is the modal content. You can put anything you want here.
                    </p>
                </div>

                {/* Footer / Actions */}
                <div className="px-6 pb-4 border-t flex justify-end">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
}
