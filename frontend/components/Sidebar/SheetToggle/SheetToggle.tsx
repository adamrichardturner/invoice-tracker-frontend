export default function SheetToggle() {
    return (
        <div className="w-full h-[104px] flex flex-col rounded-tr-3xl relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="38"
                    viewBox="0 0 40 38"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.6942 0.292175L20 18.9999L29.3058 0.292175C35.6645 3.64073 40 10.314 40 17.9999C40 29.0456 31.0457 37.9999 20 37.9999C8.9543 37.9999 0 29.0456 0 17.9999C0 10.314 4.33546 3.64073 10.6942 0.292175Z"
                        fill="white"
                    />
                </svg>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="103"
                height="103"
                viewBox="0 0 103 103"
                fill="none"
            >
                <path
                    d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
                    fill="#7C5DFA"
                />
                <mask
                    id="mask0_0_8894"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="103"
                    height="103"
                >
                    <path
                        d="M0 0H83C94.0457 0 103 8.9543 103 20V83C103 94.0457 94.0457 103 83 103H0V0Z"
                        fill="white"
                    />
                </mask>
                <g mask="url(#mask0_0_8894)">
                    <path
                        d="M103 52H20C8.95431 52 0 60.9543 0 72V135C0 146.046 8.95431 155 20 155H103V52Z"
                        fill="#9277FF"
                    />
                </g>
            </svg>
        </div>
    );
}
