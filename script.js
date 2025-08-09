document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    navToggle.classList.toggle("active")
  })

  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      navToggle.classList.remove("active")
    })
  })

  const navLinksSmooth = document.querySelectorAll('a[href^="#"]')
  navLinksSmooth.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  let lastScrollTop = 0
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent
  typeWriter(heroTitle, originalText, 50)
})

function trackClick(element, action) {
  console.log(`Clicked: ${action} on ${element}`)
}

document.addEventListener("DOMContentLoaded", () => {
  const externalLinks = document.querySelectorAll('a[target="_blank"]')
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      trackClick(this.href, "external_link")
    })
  })
})
