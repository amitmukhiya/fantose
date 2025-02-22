"use client"

import { useState } from "react"
import Image from "next/image"
import { Gift } from "lucide-react"
import img1 from "@/components/d1f55c73-ad48-4fd3-83a4-0dd2913e1513.jpeg"
import img2 from "@/components/image-84-700x700.jpeg"

import Header from "@/components/heade"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useSession, signIn, signOut } from "next-auth/react"

export default function JavelinOver() {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [selectedJavelin, setSelectedJavelin] = useState<string | null>(null)
  const [javelinNumber, setJavelinNumber] = useState(["", "", "", "", "", "", ""])
  const [disabledJavelins, setDisabledJavelins] = useState([])
  const { toast } = useToast()
  const { data: session } = useSession()
  console.log(session)

  const javelinButtons = Array.from({ length: 6 }, (_, i) => `J${i + 1}`)

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player)
    setSelectedJavelin(null)
    setJavelinNumber(["", "", "", "", "", "", ""])
  }

  const handleJavelinClick = (javelin) => {
    if (!disabledJavelins.includes(javelin)) {
      setSelectedJavelin(javelin)
    }
  }

  const handleNumberInput = (index, value) => {
    if (value.length <= 1 && !isNaN(Number(value))) {
      const newNumbers = [...javelinNumber]
      newNumbers[index] = value
      setJavelinNumber(newNumbers)

      // Auto-focus next input
      if (value !== "" && index < 6) {
        const nextInput = document.getElementById(`number-${index + 1}`)
        nextInput?.focus()
      }
    }
  }
  const handleSubmit = async () => {
  
    const name=session?.user?.name|| '';
    const email=session?.user?.email|| '';
    const matchId=123;
    const selectedNumbers=[Number(javelinNumber.join(""))];

    const res=await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, data:{matchId, selectedNumbers}}),
    });
    const data = await res.json();
    console.log(data);
}

  const handleThrowJavelin = () => {
    if (selectedPlayer && selectedJavelin && javelinNumber.every((n) => n !== "")) {
        handleSubmit();
      toast({
        title: "Success!",
        description: `${selectedPlayer} threw ${selectedJavelin} with number ${javelinNumber.join("")}`,
      })
      setDisabledJavelins([...disabledJavelins, selectedJavelin])
      setSelectedJavelin(null)
      setJavelinNumber(["", "", "", "", "", "", ""])
    }
  }

  return (
    <section className="space-y-6">
      <Header />
      <Toaster />
      <h2 className="text-xl font-bold">My Javelin Over</h2>
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {javelinButtons.map((button) => (
            <button
              key={button}
              className={`relative aspect-square rounded-full flex items-center justify-center h-16 w-16 ${
                selectedJavelin === button
                  ? "bg-green-600"
                  : disabledJavelins.includes(button)
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => handleJavelinClick(button)}
              disabled={disabledJavelins.includes(button)}
            >
              <span className="text-lg font-bold">{button}</span>
              <Gift className="absolute -top-4 -right-4 h-6 w-6 text-red-500" />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <div
              className={`cursor-pointer ${
                selectedPlayer === "Rajat Patidar" ? "border-4 border-green-500 rounded-full" : ""
              }`}
              onClick={() => handlePlayerClick("Rajat Patidar")}
            >
              <Image
                src={img1 || "/placeholder.svg"}
                alt="Rajat Patidar"
                width={90}
                height={90}
                className="rounded-full mb-2"
              />
            </div>
            <p className="font-semibold">Rajat Patidar</p>
          </div>

          <div className="text-4xl font-bold text-red-600">VS</div>

          <div className="text-center">
            <div
              className={`cursor-pointer ${
                selectedPlayer === "Venkatesh Iyer" ? "border-4 border-green-500 rounded-full" : ""
              }`}
              onClick={() => handlePlayerClick("Venkatesh Iyer")}
            >
              <Image
                src={img2 || "/placeholder.svg"}
                alt="Venkatesh Iyer"
                width={90}
                height={90}
                className="rounded-full mb-2"
              />
            </div>
            <p className="font-semibold">Venkatesh Iyer</p>
          </div>
        </div>

        {selectedPlayer && selectedJavelin && (
          <div className="space-y-4">
            <div className="bg-black p-4 rounded-lg max-w-md mx-auto">
              <div className="flex items-center bg-white rounded-full p-2">
                <div className="h-6 w-6 rounded-full bg-red-600 mr-2" />
                <div className="flex gap-2 flex-1 justify-between">
                  {javelinNumber.map((num, index) => (
                    <input
                      key={index}
                      id={`number-${index}`}
                      type="text"
                      value={num}
                      onChange={(e) => handleNumberInput(index, e.target.value)}
                      className="w-6 text-center text-black focus:outline-none"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleThrowJavelin}
                disabled={!javelinNumber.every((n) => n !== "")}
                className=" block mx-auto mt-4 text-xl text-green-900 bg-white px-8 py-4 rounded-xl "
              >Throw
                
              </button>
            </div>
          </div>
        )}

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 w-4/4" />
        </div>
      </div>
    </section>
  )
}

