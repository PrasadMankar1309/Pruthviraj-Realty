"use client"

import { useEffect } from "react"

const revealSelector = [
  ".animate-on-scroll",
  ".animate-fade-up",
  ".animate-fade-in",
  ".animate-image-reveal",
  ".animate-scale-in",
  ".animate-slide-left",
  ".animate-slide-right",
  ".animate-stagger",
  ".card-stagger-item",
  ".clip-reveal",
].join(",")

export default function ScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      root.dataset.motionReady = "true"
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )

    const revealVisibleElements = () => {
      document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (element.classList.contains("in-view")) return
        const bounds = element.getBoundingClientRect()
        if (bounds.top <= window.innerHeight * 0.9 && bounds.bottom >= 0) {
          element.classList.add("in-view")
          observer.unobserve(element)
        }
      })
    }

    const observeTree = (node: Node) => {
      if (!(node instanceof HTMLElement)) return

      if (node.matches(revealSelector) && !node.classList.contains("in-view")) {
        const bounds = node.getBoundingClientRect()
        if (bounds.top <= window.innerHeight * 0.9 && bounds.bottom >= 0) {
          node.classList.add("in-view")
        } else {
          observer.observe(node)
        }
      }

      node.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
        if (element.classList.contains("in-view")) return
        const bounds = element.getBoundingClientRect()
        if (bounds.top <= window.innerHeight * 0.9 && bounds.bottom >= 0) {
          element.classList.add("in-view")
        } else {
          observer.observe(element)
        }
      })
    }

    document.querySelectorAll<HTMLElement>(revealSelector).forEach(observeTree)
    root.dataset.motionReady = "true"
    window.addEventListener("scroll", revealVisibleElements, { passive: true })
    window.addEventListener("resize", revealVisibleElements)
    revealVisibleElements()

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeTree))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutations.disconnect()
      observer.disconnect()
      window.removeEventListener("scroll", revealVisibleElements)
      window.removeEventListener("resize", revealVisibleElements)
    }
  }, [])

  return null
}
