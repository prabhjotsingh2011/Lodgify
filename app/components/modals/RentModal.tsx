'use client'

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
// import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}


function RentModal() {
    const rentModal = useRentModal();
    const router = useRouter();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: "",
            roomCount: "",
            bathroomCount: "",
            imgSrc: "",
            price: "",
            title: "",
            description: "",
        }
    });

    const category = watch("category");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });

    };


    const onBack = () => {
        setStep((prev) => prev - 1);
    };
    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);
        try {
            axios.post('/api/listings', data)
                .then(() => {
                    setIsLoading(false);
                    reset();
                    toast.success("Listing created successfully");
                    router.refresh();
                    setStep(STEPS.CATEGORY);
                    rentModal.onClose();
                })
                .catch((err) => {
                    setIsLoading(false);
                    toast.error("Something went wrong");
                })
        } catch (error) {
            setIsLoading(false);
            toast.error("Something went wrong");
        }
    }


    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Submit";
        }
        return "Next";
    }, [step]);


    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return "Cancel";
        }
        return "Back";
    }, [step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="You can change this later"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-auto">
                {
                    categories.map((item) => (
                        <div key={item.label}
                            className="col-span-1">
                            <CategoryInput

                                label={item.label}
                                icon={item.icon}
                                selected={category === item.label}
                                onClick={(category) => { setCustomValue("category", category) }}
                            />

                        </div>
                    ))
                }
            </div>

        </div>
    )
    const location = watch("location");
    const Map = useMemo(() => dynamic(() => import("../Map")), [location]);




    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where's your place located?"
                    subtitle="Exact address will be shared with guests after booking is confirmed"
                />

                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue("location", value)}

                />
                <Map
                    center={location?.latlng}
                />
            </div>
        )
    }

    const guestCount = watch("guestCount");
    const roomCount = watch("roomCount");

    const bathroomCount = watch("bathroomCount");


    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basic info about your place"
                    subtitle="You can change this later"
                />
                <Counter
                    title="Number of Guests"
                    subtitle="How many guests can your place accommodate?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <hr />
                <Counter
                    title="Number of Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <hr />
                <Counter
                    title="Number of Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />
            </div>
        )
    }

    const imageSrc = watch("imageSrc");

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Upload some photos of your place"
                    subtitle="You can change this later"
                />

                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue("imageSrc", value)}
                />
            </div>
        )
    }


    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Describe your place to guests"
                    subtitle="You can change this later"
                />
                <Input
                    register={register}
                    id="title"
                    disabled={isLoading}
                    errors={errors}
                    required
                    label="Title"
                />
                <hr />
                <Input
                    register={register}
                    id="description"
                    disabled={isLoading}
                    errors={errors}
                    required
                    label="Description"
                />
            </div>
        )
    }


    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How much do you want to charge?"
                    subtitle="You can change this later"
                />
                <Input
                    register={register}
                    id="price"
                    disabled={isLoading}
                    errors={errors}
                    required
                    label="Price"
                    formatPrice
                    type="number"

                />
            </div>
        )
    }


    return (
        <Modal
            isOpen={rentModal.isOpen}
            title="Lodgify your home"
            onClose={rentModal.onClose}
            onSubmt={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? rentModal.onClose : onBack}
            disabled={false}
            body={bodyContent}

        />
    );
}

export default RentModal;