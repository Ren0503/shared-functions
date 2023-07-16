import { TIME } from "../constants"

export class DateFunc {
  date: Date
  constructor (date?: string | Date) {
    this.date = date && this.isValid(date) ? new Date(date) : new Date()
  }

  isValid(dateString?: any) {
    const date = dateString ? new Date(dateString) : new Date(this.date)
    if (date.toString() === 'Invalid Date') return false
    if (dateString === null) return false
    return true
  }

  setTime(timestamp: number, jwt = false) {
    if (jwt) {
      this.date = new Date(timestamp * 1000)
    } else {
      this.date = new Date(timestamp)
    }

    return this
  }

  toJwt() {
    const formatDate = new Date(this.date)

    return Math.round(formatDate.getTime() / 1000)
  }

  toDate() {
    const formatDate = new Date(this.date)
    return formatDate
  }

  checkTime(compareDate: string | Date, unit: keyof typeof TIME.Unit) {
    const compare = new Date(compareDate)
    const units: { [key: string]: number } = {
      year: this.date.getFullYear() - compare.getFullYear(),
      month: (this.date.getFullYear() - compare.getFullYear()) * 12 + (this.date.getMonth() - compare.getMonth()),
      day: Math.floor((this.date.getTime() - compare.getTime()) / (1000 * 60 * 60 * 24)),
      hour: Math.floor((this.date.getTime() - compare.getTime()) / (1000 * 60 * 60)),
      minute: Math.floor((this.date.getTime() - compare.getTime()) / (1000 * 60)),
      second: Math.floor((this.date.getTime() - compare.getTime()) / 1000), 
    }

    return units[unit]
  }

  isSame (compareDate: string | Date, unit: keyof typeof TIME.Unit) {
    return this.checkTime(compareDate, unit) === 0
  }

  isAfter (compareDate: string | Date, unit: keyof typeof TIME.Unit) {
    return this.checkTime(compareDate, unit) > 0
  }

  isBefore (compareDate: string | Date, unit: keyof typeof TIME.Unit) {
    return this.checkTime(compareDate, unit) < 0
  }

  isSameOrAfter (compareDate: string | Date, unit: keyof typeof TIME.Unit) {
    return this.checkTime(compareDate, unit) >= 0
  }

  isSameOrBefore (compareDate: string | Date, unit: keyof typeof TIME.Unit) {
    return this.checkTime(compareDate, unit) <= 0
  }

  format(text: string) {
    const day = this.date.getDate()
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0')
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.date)
    const year = this.date.getFullYear().toString()
    const minute = this.date.getMinutes().toString().padStart(2, '0')
    const second = this.date.getSeconds().toString().padStart(2, '0')
    const ampm = this.date.getHours() >= 12 ? 'pm' : 'am'
    const hour12 = this.date.getHours() % 12 || 12
    const replacements: { [key: string]: string } = {
      'Do': this.getOrdinal(day),
      'YYYY': year,
      'MM': month,
      'MMMM': monthName,
      'h': hour12.toString(),
      'hh': hour12.toString().padStart(2, '0'),
      'mm': minute,
      'ss': second,
      'a': ampm
    };
    const regex = new RegExp(Object.keys(replacements).join('|'), 'gi');
    return text.replace(regex, (matched) => replacements[matched]);
  }

  getOrdinal(day: number) {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  }

  calDuration(duration: number, unit: keyof typeof TIME.Unit) {
    const units: { [key: string]: number } = {
      second: 1000,
      minute: 60 * 1000,
      hour: 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
    }

    const value = duration * units[unit]
    return value
  }

  add(duration: number, unit: keyof typeof TIME.Unit) {
    if (unit === 'month') {
      const currentMonth = this.date.getMonth()
      this.date.setMonth(currentMonth + duration)
    } else if (unit === 'year') {
      const currentYear = this.date.getFullYear()
      this.date.setFullYear(currentYear + duration)
    } else {
      const value = this.calDuration(duration, unit)
      this.date.setTime(this.date.getTime() + value)
    }
    return this
  }

  subtract(duration: number, unit: keyof typeof TIME.Unit) {
    if (unit === 'month') {
      const currentMonth = this.date.getMonth()
      this.date.setMonth(currentMonth - duration)
    } else if (unit === 'year') {
      const currentYear = this.date.getFullYear()
      this.date.setFullYear(currentYear - duration)
    } else {
      const value = this.calDuration(duration, unit)
      this.date.setTime(this.date.getTime() - value)
    }
    return this
  }

  diff(compareDate: string, unit: keyof typeof TIME.Unit) {
    const compare = new Date(compareDate)
    let duration = this.date.getTime() - compare.getTime()
    const units: { [key: string]: any } = [
      { label: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
      { label: 'month', ms: 1000 * 60 * 60 * 24 * 30 }, // approximate value
      { label: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
      { label: 'day', ms: 1000 * 60 * 60 * 24 },
      { label: 'hour', ms: 1000 * 60 * 60 },
      { label: 'minute', ms: 1000 * 60 },
      { label: 'second', ms: 1000 },
    ]
    let result: { [key: string]: number } = {}
    units.forEach((unit: { label: string; ms: number; }) => {
      result[unit.label] = Math.floor(duration / unit.ms);
      duration -= result[unit.label] * unit.ms;
    })
    return result[unit]
  }
}
