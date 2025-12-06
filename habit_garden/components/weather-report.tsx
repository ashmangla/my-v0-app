"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Sun } from "lucide-react"

type WeatherReportProps = {
  completionRate: number
}

export function WeatherReport({ completionRate }: WeatherReportProps) {
  const getWeatherStatus = () => {
    if (completionRate > 80) {
      return {
        icon: "sunny",
        title: "Sunny Day",
        description: "Peak Performance! Your garden is thriving!",
        color: "#FFC800",
        bgColor: "#FFF9E6",
      }
    } else if (completionRate >= 50) {
      return {
        icon: "cloudy",
        title: "Cloudy Day",
        description: "Good effort! Keep nurturing your habits",
        color: "#A9D6E5",
        bgColor: "#F0F8FF",
      }
    } else {
      return {
        icon: "rainy",
        title: "Rainy Day",
        description: "Time to water your garden with action",
        color: "#01497C",
        bgColor: "#E8F4F8",
      }
    }
  }

  const weather = getWeatherStatus()

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card
        className="border-2 overflow-hidden shadow-lg"
        style={{
          borderColor: weather.color,
          backgroundColor: weather.bgColor,
        }}
      >
        <CardContent className="p-10">
          <div className="flex items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-[#220C10] mb-3 leading-tight">{weather.title}</h2>
              <p className="text-xl text-[#01497C] mb-6 leading-relaxed">{weather.description}</p>
              <div className="flex items-center gap-6">
                <div className="text-base text-[#220C10] whitespace-nowrap">
                  <span className="font-semibold">Completion:</span>{" "}
                  <span className="font-bold text-2xl">{completionRate.toFixed(0)}%</span>
                </div>
                <div className="flex-1 h-4 bg-white/50 rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full rounded-full shadow-sm"
                    style={{ backgroundColor: weather.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
            <div className="ml-8">
              {weather.icon === "sunny" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Sun className="w-28 h-28 text-[#FFC800] drop-shadow-lg" />
                </motion.div>
              )}
              {weather.icon === "cloudy" && (
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Cloud className="w-28 h-28 text-[#A9D6E5] drop-shadow-md" />
                </motion.div>
              )}
              {weather.icon === "rainy" && (
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <CloudRain className="w-28 h-28 text-[#01497C] drop-shadow-md" />
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
