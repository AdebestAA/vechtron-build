import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import gsap from 'gsap';
import { Flag } from 'lucide-react';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title,
);

const LineChart = () => {

    const lineChartRef = useRef<HTMLDivElement | null>(null);




    const data = {
        labels: ["Jan 10", "Feb 10", "Mar 10", "Apr 10", "May 10", "Jun 10",],
        datasets: [
            {
                data: [1200, 2300, 1800, 3100, 1200, 2200,],
                borderColor: "gray",
                backgroundColor: "transparent",
                tension: 0,
                borderWidth: 1,
                pointBorderWidth: 1,
                pointRadius: 2,
                pointHoverRadius: 5,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: "easeOutExpo",
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0,0,0,0.7)",
                titleColor: "#36A2EB",
                bodyColor: "white",
                mode: "index",
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    color: "gray",
                },
                border: {
                    dash: [4, 4],
                    color: "gray",
                },
            },
            y: {
                min: 0,
                max: 6000,
                grid: {
                    display: Flag,
                    color: "gray",
                },
                border: {
                    dash: [4, 4],
                    color: "gray",
                },
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        if (lineChartRef.current) {
            gsap.fromTo(
                lineChartRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 2, stagger: 0.2, ease: "power3.out" }
            );
        }
    }, []);

    return (
        <section
            className="mdsm:max-h-[400px] h-[300px] bg-transparent md:max-w-[95%] -full border-[1px] rounded-lg border-border p-2 my-4  opacity-0 "
            ref={lineChartRef}
        >

            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Line data={data} options={options as unknown as any} />


        </section>
    );
};

export default LineChart;
