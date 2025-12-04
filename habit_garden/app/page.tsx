"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WeatherReport } from "@/components/weather-report"
import { HabitCard } from "@/components/habit-card"
import { toast } from "sonner"

export type Habit = {
  id: string
  name: string
  icon: string
  frequency: string
  growthStage: number // 0-100
  completedToday: boolean
  lastCompleted: string | null
  createdAt: string
}

export default function HabitGardenTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newHabitName, setNewHabitName] = useState("")
  const [newHabitFrequency, setNewHabitFrequency] = useState("daily")
  const [deleteHabitId, setDeleteHabitId] = useState<string | null>(null)

  // Load habits from localStorage
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits")
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    }
  }, [])

  // Save habits to localStorage
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem("habits", JSON.stringify(habits))
    }
  }, [habits])

  // Check for missed habits at midnight
  useEffect(() => {
    const checkMissedHabits = () => {
      const today = new Date().toDateString()
      setHabits((prevHabits) =>
        prevHabits.map((habit) => {
          if (habit.lastCompleted !== today && !habit.completedToday && habit.lastCompleted !== null) {
            // Plant wilts - reduce growth stage
            return {
              ...habit,
              growthStage: Math.max(0, habit.growthStage - 15),
              completedToday: false,
            }
          }
          return { ...habit, completedToday: false }
        }),
      )
    }

    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const timeUntilMidnight = tomorrow.getTime() - now.getTime()

    const timeout = setTimeout(checkMissedHabits, timeUntilMidnight)
    return () => clearTimeout(timeout)
  }, [])

  const createHabit = () => {
    if (!newHabitName.trim()) {
      toast.error("Please enter a habit name")
      return
    }

    const getHabitIcon = (name: string): string => {
      const lowerName = name.toLowerCase()

      // Meditation & mindfulness
      if (lowerName.includes("meditat") || lowerName.includes("mindful") || lowerName.includes("zen")) {
        return "🧘"
      }
      // Reading & learning
      if (
        lowerName.includes("read") ||
        lowerName.includes("book") ||
        lowerName.includes("study") ||
        lowerName.includes("learn")
      ) {
        return "📚"
      }
      // Exercise & running
      if (
        lowerName.includes("run") ||
        lowerName.includes("jog") ||
        lowerName.includes("cardio") ||
        lowerName.includes("exercise")
      ) {
        return "🏃"
      }
      // Strength training
      if (
        lowerName.includes("gym") ||
        lowerName.includes("workout") ||
        lowerName.includes("strength") ||
        lowerName.includes("lift")
      ) {
        return "💪"
      }
      // Water & hydration
      if (lowerName.includes("water") || lowerName.includes("hydrat") || lowerName.includes("drink")) {
        return "💧"
      }
      // Nutrition & diet
      if (
        lowerName.includes("eat") ||
        lowerName.includes("diet") ||
        lowerName.includes("nutrition") ||
        lowerName.includes("meal") ||
        lowerName.includes("food")
      ) {
        return "🥗"
      }
      // Writing & journaling
      if (lowerName.includes("write") || lowerName.includes("journal") || lowerName.includes("diary")) {
        return "✍️"
      }
      // Art & creativity
      if (
        lowerName.includes("art") ||
        lowerName.includes("draw") ||
        lowerName.includes("paint") ||
        lowerName.includes("creative")
      ) {
        return "🎨"
      }
      // Music
      if (
        lowerName.includes("music") ||
        lowerName.includes("practice") ||
        lowerName.includes("instrument") ||
        lowerName.includes("sing")
      ) {
        return "🎵"
      }
      // Sleep
      if (lowerName.includes("sleep") || lowerName.includes("rest") || lowerName.includes("bed")) {
        return "😴"
      }
      // Morning routine
      if (lowerName.includes("morning")) {
        return "🌅"
      }
      // Brain & learning
      if (lowerName.includes("brain") || lowerName.includes("mental") || lowerName.includes("focus")) {
        return "🧠"
      }

      // Default fallback icons
      const fallbackIcons = ["🌟", "✨", "🎯", "💫", "🌈"]
      return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)]
    }

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      icon: getHabitIcon(newHabitName),
      frequency: newHabitFrequency,
      growthStage: 0,
      completedToday: false,
      lastCompleted: null,
      createdAt: new Date().toISOString(),
    }

    setHabits([...habits, newHabit])
    setNewHabitName("")
    setNewHabitFrequency("daily")
    setIsModalOpen(false)

    toast.success(`Seed Planted! 🌱`, {
      description: `${newHabitName} has been added to your garden`,
    })
  }

  const completeHabit = (habitId: string) => {
    playWateringSound() // Play watering sound on every completion

    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === habitId) {
          const newGrowthStage = Math.min(100, habit.growthStage + 10)
          const wasFruiting = habit.growthStage >= 80
          const isFruiting = newGrowthStage >= 80

          // Play sound when reaching fruiting stage
          if (!wasFruiting && isFruiting) {
            playBloomSound()
          }

          return {
            ...habit,
            growthStage: newGrowthStage,
            completedToday: true,
            lastCompleted: new Date().toDateString(),
          }
        }
        return habit
      }),
    )
  }

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter((habit) => habit.id !== habitId))
    setDeleteHabitId(null)
    toast.success("Habit Removed", {
      description: "The habit has been removed from your garden",
    })
  }

  const playBloomSound = () => {
    // Create a simple chime sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"
    gainNode.gain.value = 0.3

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)

    // Second note
    setTimeout(() => {
      const osc2 = audioContext.createOscillator()
      const gain2 = audioContext.createGain()
      osc2.connect(gain2)
      gain2.connect(audioContext.destination)
      osc2.frequency.value = 1000
      osc2.type = "sine"
      gain2.gain.value = 0.3
      osc2.start(audioContext.currentTime)
      osc2.stop(audioContext.currentTime + 0.2)
    }, 100)
  }

  const playWateringSound = () => {
    // Create a gentle water droplet sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 600
    oscillator.type = "sine"
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const completionRate = habits.length > 0 ? (habits.filter((h) => h.completedToday).length / habits.length) * 100 : 0

  const bloomedHabitsCount = habits.filter((h) => h.growthStage >= 100).length

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#D4EDDA" }}>
      {bloomedHabitsCount > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: bloomedHabitsCount }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="absolute text-6xl"
              style={{
                color: "#FFC800",
                left: `${(index * 17 + 5) % 90}%`,
                top: `${(index * 23 + 10) % 80}%`,
                transform: `rotate(${index * 45}deg)`,
              }}
            >
              🌻
            </motion.div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-6 py-12 max-w-7xl relative z-10">
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[85vh]"
          >
            {/* Sun Icon */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              className="mb-16"
            >
              <img
                src="/sun.png"
                alt="Sun"
                className="w-40 h-40 drop-shadow-lg"
                onError={(e) => {
                  // Fallback to emoji sun if image not found
                  e.currentTarget.style.display = "none"
                  const fallback = document.createElement("div")
                  fallback.className = "text-9xl"
                  fallback.textContent = "☀️"
                  e.currentTarget.parentElement?.appendChild(fallback)
                }}
              />
            </motion.div>

            <h1 className="text-6xl font-bold text-[#220C10] mb-6 text-balance text-center leading-tight">
              Welcome to Your Habit Garden
            </h1>
            <p className="text-2xl text-[#01497C] mb-16 text-center max-w-xl leading-relaxed">
              Start cultivating healthy habits today
            </p>

            {/* Plant Your Seed Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              size="lg"
              className="border-2 border-[#009B72] text-[#009B72] hover:bg-[#009B72] hover:text-white bg-white text-xl px-12 py-8 h-auto font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Plant Your Seed
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-5xl font-bold text-[#220C10] mb-3 text-balance">Welcome to Your Habit Garden</h1>
              <p className="text-[#01497C] text-xl leading-relaxed">
                Track your daily habits and watch your garden flourish
              </p>
            </motion.div>

            {/* Weather Report */}
            <WeatherReport completionRate={completionRate} />

            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-[#220C10]">Your Habits</h2>
                <span className="text-[#01497C] text-lg">
                  {habits.filter((h) => h.completedToday).length} of {habits.length} completed today
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {habits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onComplete={completeHabit}
                      onDelete={(id) => setDeleteHabitId(id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating Action Button */}
            <motion.div className="fixed bottom-8 right-8" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                size="icon"
                className="w-16 h-16 rounded-full shadow-xl border-2 border-[#FFC800] bg-[#FFC800] hover:bg-[#FFC800]/90 hover:border-[#FFC800] hover:shadow-2xl transition-all"
              >
                <img
                  src="/sun.png"
                  alt="Add habit"
                  className="w-8 h-8"
                  onError={(e) => {
                    // Fallback to icon if image not found
                    e.currentTarget.style.display = "none"
                    e.currentTarget.nextElementSibling?.classList.remove("hidden")
                  }}
                />
                <Plus className="w-8 h-8 text-[#220C10] hidden" />
              </Button>
            </motion.div>
          </>
        )}

        {/* Create Habit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-[#FEFCFB] border-2 border-[#A9D6E5]">
            <DialogHeader>
              <DialogTitle className="text-3xl text-[#220C10] font-bold mb-2">Plant a New Seed</DialogTitle>
              <DialogDescription className="text-[#01497C] text-lg">
                Add a new habit to nurture and grow in your garden
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-[#220C10] text-lg font-semibold">
                  Habit Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., Morning Meditation"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="border-2 border-[#A9D6E5] focus-visible:ring-[#009B72] text-lg py-6"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="frequency" className="text-[#220C10] text-lg font-semibold">
                  Frequency Goal
                </Label>
                <Select value={newHabitFrequency} onValueChange={setNewHabitFrequency}>
                  <SelectTrigger className="border-2 border-[#A9D6E5] focus:ring-[#009B72] text-lg py-6">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={createHabit}
                className="border-2 border-[#009B72] text-[#009B72] hover:bg-[#009B72] hover:text-white bg-transparent text-lg px-8 py-6 h-auto font-semibold"
              >
                Plant Seed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteHabitId !== null} onOpenChange={(open) => !open && setDeleteHabitId(null)}>
          <AlertDialogContent className="bg-[#FEFCFB] border-2 border-[#A9D6E5]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-[#220C10] font-bold">Remove this habit?</AlertDialogTitle>
              <AlertDialogDescription className="text-[#01497C] text-lg leading-relaxed">
                This action cannot be undone. The habit and its growth progress will be permanently removed from your
                garden.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-2 border-[#A9D6E5] text-lg px-6 py-6 h-auto">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteHabitId && deleteHabit(deleteHabitId)}
                className="bg-[#720026] hover:bg-[#720026]/90 text-white text-lg px-6 py-6 h-auto"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
