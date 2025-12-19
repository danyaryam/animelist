import Image from "next/image";
import SendButton from "@/components/Utilities/SendButton";

export default function Page() {
    return (
        <div className="w-full min-h-screen bg-white flex flex-col md:flex-row">
            <div className="relative w-full my-10 ml-8 md:w-1/2 h-72 md:h-auto">
                <Image
                    src="/receptions.jpg"
                    alt="Office Photo"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="w-full md:w-1/2 px-8 md:px-16 py-10">
                <h1 className="text-3xl font-semibold text-color-primary mb-3">
                    Contact us
                </h1>

                <p className="text-color-primary leading-relaxed mb-10 max-w-lg">
                    Use this form for all general enquiries. We monitor these responses
                    constantly during working hours. If you are looking to partner with us,
                    please complete the new customer application form instead.
                </p>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm font-medium text-color-primary">
                                FULL NAME <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 border-b-4 border-b-color-accent py-2"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-color-primary">
                                PHONE NUMBER <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your number"
                                className="w-full mt-1 border-b-4 border-b-color-accent py-2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-color-primary">
                            EMAIL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 border-b-4 border-b-color-accent py-2"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-color-primary">
                            MESSAGE <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            placeholder="Enter your message"
                            rows={4}
                            className="w-full mt-1 border-b-4 border-b-color-accent py-2 resize-none"
                        ></textarea>
                    </div>

                    {/* reCAPTCHA Placeholder
                    <div className="border rounded-md p-4 w-fit flex items-center gap-3">
                        <input type="checkbox" />
                        <span className="text-sm text-gray-700 select-none">I'm not a robot</span>
                        <div className="w-20 h-6 bg-gray-200 rounded"></div>
                    </div> */}

                    <SendButton />
                </form>

            </div>
        </div>
    );
}
