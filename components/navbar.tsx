import Image from 'next/image'

export default function NavBar() {
    return (
        <div className="w-full flex-grow bg-black flex-col">
            <Image src={"/ezevLogo.png"} width={100} height={100} alt="EZEV Logo" />
        </ div> 
    );
}