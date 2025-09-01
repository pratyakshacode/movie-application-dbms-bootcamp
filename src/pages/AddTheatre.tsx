import { useMutation } from "@tanstack/react-query";
import { useState } from "react"
import Service from "../utils/http";
import Spinner from "../components/Spinner";

const AddTheatre = () => {

    const [theatreName, setTheatreName] = useState('');
    const [location, setLocation] = useState('');
    const service = new Service();
    
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(!theatreName) {
            alert("Theatre Name is Required");
            return;
        }

        if(!location) {
            alert("Location is required for theatre");
            return;
        }

        mutate();
    }

    const addTheatre = async () => {
        return await service.post('theatre/add', { theatreName, location });
    }

    const { mutate, isPending } = useMutation({
        mutationFn: addTheatre,
        onSuccess(json) {
            setTheatreName('');
            setLocation('');
            alert(json.message);
        },
        onError(error: any) {
            console.error(error);
            alert(error?.response?.data?.message ?? "ERROR");
        }
    });

  return (
    <div className="flex justify-center items-center w-full  text-white" style={{ height: '90vh' }}>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center border h-[500px] border-gray-500 rounded-xl w-[500px]">
            <h1 className="text-left">Theatre Name</h1>
            <input 
                type="text" 
                className="h-[50px] w-4/5 rounded-xl my-2 p-2 bg-gray-500 outline-none" 
                value={theatreName}
                onChange={(e) => setTheatreName(e.target.value)}
                
            />
            <h1 className="text-left">Theatre Location</h1>
            <input 
                type="text" 
                className="h-[50px] w-4/5 rounded-xl my-2 p-2 bg-gray-500 outline-none" 
                onChange={(e) => setLocation(e.target.value)}
                value={location}
            />
            <button className="px-6 py-1 border my-4 rounded-xl hover:bg-gray-700 w-[300px] h-[40px] flex justify-center items-center">
                {
                    isPending ? <Spinner size={20}  color="teal"/> : "Add Theatre"
                }
            </button>
        </div>
        </form>
    </div>
  )
}

export default AddTheatre
