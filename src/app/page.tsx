'use client'
import Explication from "@/components/Explication";
import Header from "@/components/Header";
import InfoContainer from "@/components/InfoContainer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [country, setCountry] = useState<any>(null)
  const [weather, setWeather] = useState<any>(null)
  console.log(weather)
  console.log(country)
  return (
    <>
      <Header>
        <form action="/api/search-weather" method="post" onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          let input = document.getElementById('search') as HTMLInputElement
          await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&lat=-21.017507&lon=-42.837470&units=metric&lang=pt_br&exclude=hourly,daily&appid=${'4286c7e8bf2cf35ba23782a3ca4cdf7d'}`)
            .then(data => data.json())
            .then(data => {
              setWeather(data)
              fetch(`https://restcountries.com/v3.1/alpha/${data.sys.country}`)
                .then(data => data.json())
                .then(data => {
                  setCountry(data)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }}>
          <label htmlFor="search" className='relative'>
            <input type="text" name="search" id="search" placeholder='Procurar . . .'
              className='bg-light placeholder:text-zinc-500 text-zinc-700 search-full
                        focus:border-2 border-transparent outline-0'
            />
            <button type="submit">
              <Image src={'/search.svg'} width={25} height={25} alt='Pesquisa'
                className='absolute right-2 top-1/2 -translate-y-1/2' />
            </button>
          </label>
        </form>
      </Header>
      <main className="flex min-h-[var(--altura)] bg-light items-center">
        {country === null ?
          <InfoContainer>
            <p className="text-zinc-700 text-xl text-center">
              Procure por um local pelo nome para saber suas informações climáticas.
            </p>
          </InfoContainer> :
          <InfoContainer>
            <div className="flex gap-4 justify-center">
              <Image className="h-fit" src={country[0].flags.svg} width={45} height={40} alt="Bandeira" />
              -
              <Link href={country[0].maps.googleMaps} target="_blank">
                <h2 className="text-xl text-dark font-semibold underline hover:no-underline hover:text-zinc-500">{country[0].translations.por.common}</h2>
              </Link>
            </div>
            <div className="flex flex-col gap-2 items-center mt-2">
              <Link target="_blank" href={`https://www.google.com/maps/place/${weather.name},+${country[0].translations.por.common}`}>
                <p className="text-xl text-dark font-semibold underline hover:no-underline hover:text-zinc-500">{weather.name}</p>
              </Link>
              <p className="text-dark text-xl tracking-wider">
                <abbr title="Temperatura">Temp.</abbr>
                <span className="mx-2">:</span>
                {weather.main.temp}°C</p>
              <p className="text-dark text-xl tracking-wider">{weather.main.feels_like}°C</p>
              <Image className="-mt-5 -mb-5" src={`/weather/${weather.weather[0].icon}.png`} width={100} height={100} alt="Clima" />
              <p className="text-dark text-xl tracking-wider uppercase">{weather.weather[0].description}</p>
              <p className="text-dark text-xl tracking-wider">{(Number(weather.wind.speed) * 3.6).toFixed(1)}</p>
              <p className="text-dark text-xl tracking-wider flex">
                <button onFocus={(e: React.FocusEvent<HTMLElement>) => {
                  e.target.children[0].classList.remove('hidden')
                }}
                  onBlur={(e: React.FocusEvent<HTMLElement>) => {
                    e.target.children[0].classList.add('hidden')
                  }}
                  className="rounded-3xl relative">
                  <Explication>Humidade</Explication>
                  <Image src={`/icons/humid.svg`} width={25} height={25} alt="Logo Humidade" />
                </button>
                <span className="mx-2">:</span>{weather.main.humidity}%
              </p>
            </div>
          </InfoContainer>
        }
      </main>
    </>
  )
}
