import Form from "./form";

const ContactForm = () => {
    return (
        <div className="sm:w-3/4 w-full mx-auto flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-richblack-100">Get in Touch</h2>
            <p className="text-richblack-300">We’d love to here for you, Please fill out this form.</p>


            <div className="sm:w-[70%] w-[95%] my-10 mx-auto">
                <Form></Form>
            </div>
        </div>
    )
}

export default ContactForm;