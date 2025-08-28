import { useSearchParams } from "react-router-dom";
import Service from "../utils/http";
import { useQuery } from "@tanstack/react-query";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();


    const service = new Service();

    const verifyPayment = async () => {
        const sessionId = searchParams.get("session_id");
        return await service.get(`payment/verify?sessionId=${sessionId}`);
    };

    const { data: payment } : any = useQuery({
        queryKey: ['paymentSuccess'],
        queryFn: verifyPayment,
    });

  return (
    <div className="flex w-full h-[50vh] flex-col text-white justify-center items-center border">
      <h1>Payment Successful 🎉</h1>
      <p>Your booking is confirmed!</p>
      <p>Payment Id: { payment?.paymentId } </p>
    </div>
  );
}
