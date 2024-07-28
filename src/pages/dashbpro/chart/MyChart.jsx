import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Axios } from '../../../Api/Axios';
import { CUNTBILL, TOTALPRICE, USERSELER } from '../../../Api/Api';
import style from './myChart.module.css'; // استيراد ملف CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faDollarSign, faUser } from '@fortawesome/free-solid-svg-icons';

export default function MyChart() {
    const [mostUser, setMostUser] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [countBill, setCountBill] = useState(null);
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // مرجع لتخزين الرسم البياني

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mostUserResponse, totalPriceResponse, countBillResponse] = await Promise.all([
                    Axios.get(`/${USERSELER}`),
                    Axios.get(`/${TOTALPRICE}`),
                    Axios.get(`/${CUNTBILL}`)
                ]);

                setMostUser(mostUserResponse.data);
                setTotalPrice(totalPriceResponse.data);
                setCountBill(countBillResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // تدمير الرسم البياني القديم إذا كان موجودًا
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // إعادة إنشاء الرسم البياني بعد تحديث البيانات
        if (mostUser !== null && countBill !== null && totalPrice !== null) {
            const ctx = chartRef.current.getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'bar', // يمكنك تغيير نوع الرسم البياني إلى 'line' أو 'pie' أو أي نوع آخر
                data: {
                    labels: ['Highest Sales', 'Number of Invoices', 'Total Bills'],
                    datasets: [{
                        label: 'Data',
                        data: [mostUser, countBill, totalPrice],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true, // تأكد من أن الرسم البياني يستجيب لحجم الحاوية
                    maintainAspectRatio: false, // السماح بتغيير نسبة العرض إلى الارتفاع
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [mostUser, countBill, totalPrice]);

    return (
        <div className={style.container}>
             <div className={style.dataContainer}>
                <div className={style.dataItem}>
                <div className={style.icon} >
                    <FontAwesomeIcon icon={faUser}  />
                    </div>
                    <div><h5>Highest Sales</h5>
                    <h5 className=' fw-bold'>${mostUser}</h5></div>
                    
                 
                    
                </div>
                <div className={style.dataItem}>
                <div className={style.icon2}>
                   <FontAwesomeIcon icon={faCartArrowDown}    />
                   </div>
                    <div>
                    <h5>Invoices Count</h5>
                    <h5 className=' fw-bold'>${countBill}</h5>
                    </div>
                   
                    
                </div>
                <div className={style.dataItem}>
                <div className={style.icon3}>
                 <FontAwesomeIcon icon={faDollarSign}    />
                 </div>
                    <div>
                    <h5>Total Bills</h5>
                    <h5 className=' fw-bold'>{totalPrice}</h5>
                    </div>
                 
                   
                </div>
            </div>
        <div className={style.containerChart}>
            <div className={style.chartContainer}>
                {mostUser === null || countBill === null || totalPrice === null ? (
                    <p>Loading...</p>
                ) : (
                    <canvas ref={chartRef}></canvas>
                )}
            </div>
        </div>
        </div>
    );
}
