"use client"

import Header from "@/components/heade"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
// const leaderboardData = [
//   { name: "Akshay", accuracy: "79.25%", rank: "#175696" },
//   { name: "Rinku", accuracy: "91.25%", rank: "#1" },
//   { name: "Ranjit", accuracy: "90.10%", rank: "#2" },
//   { name: "Virat", accuracy: "88.75%", rank: "#3" },
//   { name: "Dhoni", accuracy: "87.50%", rank: "#4" },
// ];



export default function Leaderboard() {
  const sampleData = [];
  const luck=9999999;
  const [leaderboardData, setleaderboardData] = useState([]);
  const [state, setState] = useState({ num: 0 })
  const counter = useRef(0);

  useEffect(() => {

    fetchLeaderboardData()
    if (counter.current < 10) {
      counter.current += 1;
      const timer = setTimeout(() => setState({ num: state.num + 1 }), 100000);

      return () => clearTimeout(timer);
    }
    
  }, [state]);
  const fetchLeaderboardData = async () => {
    const response = await fetch("/api/user")
    const data = await response.json()
    data.data.map((user, index) => {
      console.log(user);
      let temp=1;
      user.data.selectedNumbers?.map((num, index) => {
        
        const acc=(num/luck)*100.0;
        const accuracy=acc.toFixed(2)+"%";
        sampleData.push({ name: user.name + ' J'+temp, accuracy: accuracy })
        temp++;
      })
      
      

      
    })
    //setleaderboardData(data)
    console.log(data)
    console.log(sampleData)
    sampleData.sort((a, b) => {
      return Number.parseFloat(b.accuracy) - Number.parseFloat(a.accuracy)
    }
    )
    setleaderboardData(sampleData)
  }



  return (
    <section className="space-y-6">
      <Header />
      <h2 className="text-xl font-bold">Leaderboard</h2>

      <div className="bg-gray-900 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 p-4 border-b border-gray-800 bg-gray-900/50 text-white">
          <div className="font-semibold">Player</div>
          <div className="font-semibold text-center">Accuracy</div>
          <div className="font-semibold text-right">Rank</div>
        </div>

        {/* Leaderboard entries */}
        <div className="divide-y divide-gray-800">
          {leaderboardData.map((player, index) => (
            <div key={index} className="grid grid-cols-3 p-4 items-center hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-3 text-white">
                <Avatar className="h-8 w-8 bg-red-600">
                  <AvatarFallback className="text-white">{player.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{player.name}</span>
              </div>

              <div className="text-center">
                <span
                  className={`
                  px-3 py-1 rounded-full text-sm
                  ${
                    Number.parseFloat(player.accuracy) >= 90
                      ? "bg-green-500/20 text-green-400"
                      : Number.parseFloat(player.accuracy) >= 80
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }
                `}
                >
                  {player.accuracy}
                </span>
              </div>

              <div className="text-right text-sm">
                <span
                  className={`
                  ${
                    index ==0
                      ? "text-yellow-400"
                      : index == 1
                        ? "text-gray-400"
                        : index == 2
                          ? "text-amber-700"
                          : "text-gray-500"
                  }
                `}
                >
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

