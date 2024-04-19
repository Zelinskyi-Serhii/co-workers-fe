'use client'

import Image from "next/image";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mainImage from '../assets/home-main-image.png';
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const section1Tl = gsap.timeline();

    section1Tl.to('.main-desc', { opacity: 1, duration: 1, top: 0 })
    .to('.main-image', { opacity: 1, duration: 1, top: 0 }, '-=0.5')
    .to('.main-title', { opacity: 1, duration: 1, top: 0 }, '-=0.5')
    
    // Section 2 Animation
    const section2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-2',
        start: 'top center+=200',
        toggleActions: 'play none none none',
      },
    });
    section2Tl.to('.section-2-title', { opacity: 1, duration: 0.5, left: 0 })
      .to('.section-2-cards', { opacity: 1, duration: 0.6, bottom: 0, stagger: 0.2 });

    // Section 3 Animation
    const section3Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-3',
        start: 'top center+=200',
        toggleActions: 'play none none none',
      },
    });
    section3Tl.to('.section-3-title', { opacity: 1, duration: 1, left: 0 })
    .to('.section-3-cards', { opacity: 1, duration: 0.6, bottom: 0, stagger: 0.2 });

    // Section 4 Animation
    const section4Tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-4',
        start: 'top center+=400',
        toggleActions: 'play none none none',
      },
    });
    section4Tl.to('.section-4-title', { opacity: 1, duration: 0.5, left: 0 })
    .to('.section-4-card', { opacity: 1, duration: 1, bottom: 0 })

    // Clean up
    return () => {
      section1Tl.kill();
      section2Tl.kill();
      section3Tl.kill();
      section4Tl.kill();
    };
  
  }, []);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8 lg:px-16 xl:px-20">
      <section className="mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="relative text-3xl font-bold mb-4 text-[#FFF] main-title opacity-0 top-[-50px]">Welcome to CO-Workers</h2>
          <Image
            src={mainImage}
            alt="Illustration of a diverse team collaborating in an office setting"
            width={600}
            height={300}
            className="relative mx-auto mb-8 main-image opacity-0 top-[-50px]"
          />
          <p className="text-lg text-[#FFF] main-desc relative opacity-0 top-[-50px]">
            Empower Your Company&apos;s Potential
          </p>
        </div>
      </section>

      <section className="mb-12 section-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[#FFF] section-2-title relative opacity-0 left-[-50px]">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 section-2-cards relative opacity-0 bottom-[-100px]">
              <h3 className="text-lg font-semibold mb-2">Create and Customize Companies</h3>
              <p className="text-gray-600">
                Easily create and customize company profiles with essential details like
                the owner&apos;s name, establishment date, company logo, and name.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 section-2-cards relative opacity-0 bottom-[-100px]" >
              <h3 className="text-lg font-semibold mb-2">Effortless Employee Management</h3>
              <p className="text-gray-600">
                Add, update, or remove employees effortlessly. Capture vital employee
                information such as first and last names, positions, birthdays, hire dates, and avatars.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 section-2-cards relative opacity-0 bottom-[-100px]">
              <h3 className="text-lg font-semibold mb-2">Seamless Sharing with Public URLs</h3>
              <p className="text-gray-600">
                Generate public URLs to share with your team members. Allow employees to access
                a dedicated webpage showcasing the company&apos;s roster.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section  className="mb-12 section-3">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[#FFF] section-3-title relative opacity-0 left-[-50px]">Engage and Improve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6  section-3-cards relative opacity-0 bottom-[-100px]">
              <h3 className="text-lg font-semibold mb-2">Enhance Employee Experience</h3>
              <p className="text-gray-600">
                Empower your employees with a centralized platform to access company information
                and connect with colleagues.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 section-3-cards relative opacity-0 bottom-[-100px]">
              <h3 className="text-lg font-semibold mb-2">Transparent Feedback System</h3>
              <p className="text-gray-600">
                Enable visitors and employees to leave anonymous reviews for individual employees.
                Gather valuable insights and create a culture of continuous improvement.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6  section-3-cards relative opacity-0 bottom-[-100px]">
              <h3 className="text-lg font-semibold mb-2">Your Platform, Your Vision</h3>
              <p className="text-gray-600">
                CO-Workers adapts to your unique needs, offering a user-friendly interface
                and robust features to elevate your company&apos;s performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 section-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[#FFF] section-4-title relative opacity-0 left-[-50px]">Search Employee by Full Name</h2>
          <div className="bg-white rounded-lg shadow-md p-6 section-4-card relative opacity-0 bottom-[-100px]">
            <p className="text-gray-600">
              Easily find employees by their full names using the powerful search functionality.
              Whether you&apos;re an owner, employee, or visitor, quickly locate specific individuals within the company&apos;s roster.
              This feature enhances user experience and facilitates efficient navigation within the platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
