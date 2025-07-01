# Platforma do organizacji podróży i wyjazdów

## Opis projektu
Aplikacja webowa umożliwiająca planowanie podróży oraz organizację wyjazdów. System zapewnia lepszą logistykę i wygodę planowania poprzez intuicyjny interfejs pozwalający na tworzenie planów podróży, dodawanie miejsc do odwiedzenia, zarządzanie rezerwacjami hoteli oraz środkami transportu.

## Funkcjonalności
- **Tworzenie planów podróży** - możliwość utworzenia nowego planu podróży z nazwą, datami i opisem
- **Zarządzanie elementami podróży** - dodawanie miejsc do odwiedzenia, rezerwacji hoteli i środków transportu
- **Edycja i modyfikacja** - pełna edycja istniejących planów podróży i ich elementów
- **Przeglądanie wyjazdów** - czytelny widok wszystkich zaplanowanych podróży
- **Szczegóły podróży** - szczegółowy widok pojedynczej podróży z wszystkimi elementami
- **Usuwanie** - możliwość usunięcia planów podróży i poszczególnych elementów

## Instrukcja uruchomienia

### Wymagania
- Node.js w wersji 14.x lub wyższej
- npm lub yarn

### Instalacja
```bash
# Klonowanie repozytorium
git clone [URL_REPOZYTORIUM]
cd travel-planner

# Instalacja zależności
npm install

# Uruchomienie aplikacji
npm start
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## Wykorzystane biblioteki
- **express** (4.18.2) - framework webowy dla Node.js
- **ejs** (3.1.9) - silnik szablonów do renderowania widoków
- **body-parser** (1.20.2) - parsowanie danych z formularzy
- **method-override** (3.0.0) - obsługa metod PUT i DELETE w formularzach
- **uuid** (9.0.0) - generowanie unikalnych identyfikatorów
- **express-session** (1.17.3) - zarządzanie sesjami użytkownika
- **dotenv** (16.0.3) - zarządzanie zmiennymi środowiskowymi

## Struktura aplikacji

### Modele (`/models`)
- **Trip.js** - model reprezentujący plan podróży (id, nazwa, data początkowa, data końcowa, opis)
- **Place.js** - model miejsc do odwiedzenia (id, tripId, nazwa, adres, opis)
- **Hotel.js** - model rezerwacji hotelowych (id, tripId, nazwa hotelu, adres, data check-in, data check-out)
- **Transport.js** - model środków transportu (id, tripId, typ, z/do, data, godzina)

### Kontrolery (`/controllers`)
- **tripController.js** - obsługa operacji CRUD dla planów podróży
- **placeController.js** - zarządzanie miejscami do odwiedzenia
- **hotelController.js** - obsługa rezerwacji hotelowych
- **transportController.js** - zarządzanie środkami transportu

### Widoki (`/views`)
- **layout.ejs** - główny szablon strony
- **index.ejs** - strona główna z listą podróży
- **trips/**
  - **show.ejs** - szczegóły podróży
  - **new.ejs** - formularz tworzenia nowej podróży
  - **edit.ejs** - formularz edycji podróży
- **places/**
  - **new.ejs** - formularz dodawania miejsca
  - **edit.ejs** - formularz edycji miejsca
- **hotels/**
  - **new.ejs** - formularz dodawania hotelu
  - **edit.ejs** - formularz edycji hotelu
- **transports/**
  - **new.ejs** - formularz dodawania transportu
  - **edit.ejs** - formularz edycji transportu

## Przykładowe dane wejściowe

### Plan podróży
```json
{
  "name": "Wakacje w Grecji",
  "startDate": "2024-07-15",
  "endDate": "2024-07-22",
  "description": "Tygodniowy wypoczynek na wyspach greckich"
}
```

### Miejsce do odwiedzenia
```json
{
  "name": "Akropol",
  "address": "Athens 105 58, Grecja",
  "description": "Starożytna cytadela na wzgórzu"
}
```

### Rezerwacja hotelu
```json
{
  "name": "Hotel Poseidon",
  "address": "Santorini, Grecja",
  "checkIn": "2024-07-15",
  "checkOut": "2024-07-22"
}
```

### Środek transportu
```json
{
  "type": "Samolot",
  "from": "Warszawa",
  "to": "Ateny",
  "date": "2024-07-15",
  "time": "10:30"
}
```