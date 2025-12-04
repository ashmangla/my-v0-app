"use client"

import { motion } from "framer-motion"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Habit } from "@/app/page"

type HabitCardProps = {
  habit: Habit
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

export function HabitCard({ habit, onComplete, onDelete }: HabitCardProps) {
  const getPlantColor = () => {
    if (habit.growthStage >= 80) {
      return "#FFC800" // Fruiting - bright yellow
    } else if (habit.growthStage >= 40) {
      return "#009B72" // Growing - green
    } else {
      return "#A9D6E5" // Seedling - light blue
    }
  }

  const getPlantStage = () => {
    if (habit.growthStage === 0) {
      return { emoji: "🌰", label: "Seed Planted" }
    } else if (habit.growthStage === 10) {
      return { emoji: "🌱", label: "Germinating" }
    } else if (habit.growthStage === 20) {
      return { emoji: "🌱", label: "Tiny Sprout" }
    } else if (habit.growthStage === 30) {
      return { emoji: "🌾", label: "Young Sprout" }
    } else if (habit.growthStage === 40) {
      return { emoji: "🌾", label: "Young Plant" }
    } else if (habit.growthStage === 50) {
      return { emoji: "🌿", label: "Growing Strong" }
    } else if (habit.growthStage === 60) {
      return { emoji: "🍀", label: "Maturing" }
    } else if (habit.growthStage === 70) {
      return { emoji: "🪴", label: "Pre-Bloom" }
    } else if (habit.growthStage === 80) {
      return { emoji: "🌸", label: "Budding" }
    } else if (habit.growthStage === 90) {
      return { emoji: "🌼", label: "Blooming" }
    } else if (habit.growthStage === 100) {
      return { emoji: "🌻", label: "Full Bloom!" }
    }
    return { emoji: "🌰", label: "Seed" }
  }

  const plantStage = getPlantStage()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative border-2 border-[#A9D6E5] bg-white hover:shadow-2xl transition-all h-full">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(habit.id)}
          className="absolute top-3 right-3 w-9 h-9 border-[#720026] text-[#720026] hover:bg-[#720026] hover:text-white z-10 shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <CardHeader className="pb-4 pt-6">
          <CardTitle className="text-xl text-[#220C10] flex items-center gap-4 pr-12">
            <span className="text-4xl">{habit.icon}</span>
            <span className="text-balance leading-tight font-bold">{habit.name}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <motion.div key={habit.growthStage} initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl">
                {plantStage.emoji}
              </motion.div>
              <div className="text-xs text-[#01497C] font-semibold text-center">{plantStage.label}</div>
            </div>

            <div className="flex-1">
              <div className="text-base text-[#01497C] mb-3 font-semibold">Day {habit.growthStage / 10} of 10</div>
              <div className="h-4 bg-[#A9D6E5]/20 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full rounded-full shadow-sm"
                  style={{ backgroundColor: getPlantColor() }}
                  initial={{ width: 0 }}
                  animate={{ width: `${habit.growthStage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-2 border-[#009B72] text-[#009B72] hover:bg-[#009B72] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed bg-transparent py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all"
            onClick={() => onComplete(habit.id)}
            disabled={habit.completedToday}
          >
            <img
              src="/watering_can.png"
              alt="Water"
              className="w-5 h-5 mr-2"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            {habit.completedToday ? "Completed Today ✓" : "Water Plant"}
          </Button>

          <div className="text-sm text-[#01497C] text-center font-medium">
            {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)} Goal
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
