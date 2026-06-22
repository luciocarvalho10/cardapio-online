import { ProductValidationError } from '../errors/ProductValidationError';
import { PriceLocaleOptions } from '../types/priceOptions';

const DEFAULT_LOCALE = 'pt-BR';
const DEFAULT_CURRENCY = 'BRL';

export class Price {
  private constructor(private readonly _cents: number) {}

  private static validateValue(value: number): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new ProductValidationError('price', 'Preço inválido');
    }
  }

  static create(value: number): Price {
    this.validateValue(value);
    return Price.fromCents(Math.round(value * 100));
  }

  static fromCents(cents: number): Price {
    this.validateValue(cents / 100);

    return new Price(cents);
  }

  static fromInput(input: string, options?: PriceLocaleOptions): Price {
    const locale = options?.locale ?? DEFAULT_LOCALE;
    const cents = Price.parseInputToCents(input, locale);
    return Price.fromCents(cents);
  }

  get amount(): number {
    return this._cents / 100;
  }

  get cents(): number {
    return this._cents;
  }

  format(options?: PriceLocaleOptions): string {
    const locale = options?.locale ?? DEFAULT_LOCALE;
    const currency = options?.currency ?? DEFAULT_CURRENCY;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(this.amount);
  }

  equals(other: Price): boolean {
    return this._cents === other._cents;
  }

  private static isCommaDecimalLocale(locale: string): boolean {
    return !locale.startsWith('en');
  }

  private static cleanNumericInput(input: string): string {
    return input.trim().replace(/[^\d.,-]/g, '');
  }

  private static isValidDecimalFraction(part: string): boolean {
    return part.length >= 1 && part.length <= 2;
  }

  private static validateParts(parts: string[]): boolean {
    return parts.length === 2 && this.isValidDecimalFraction(parts[1]);
  }

  private static handleBothSeparators(cleaned: string): string {
    const lastCommaPos = cleaned.lastIndexOf(',');
    const lastDotPos = cleaned.lastIndexOf('.');

    if (lastCommaPos > lastDotPos) {
      // Comma é o separador decimal
      return cleaned.replace(/\./g, '').replace(',', '.');
    }
    // Dot é o separador decimal
    return cleaned.replace(/,/g, '');
  }

  private static handleCommaSeparator(
    cleaned: string,
    isCommaDecimal: boolean
  ): string {
    if (isCommaDecimal) {
      return cleaned.replace(',', '.');
    }

    const parts = cleaned.split(',');
    
    return this.validateParts(parts) ? cleaned.replace(',', '.') : cleaned.replace(/,/g, '');
  }

  private static handleDotSeparator(
    cleaned: string,
    isCommaDecimal: boolean
  ): string {
    if (!isCommaDecimal) {
      return cleaned;
    }

    const parts = cleaned.split('.');

    return this.validateParts(parts) ? cleaned : cleaned.replace(/\./g, '')
  }

  private static normalizeDecimalSeparator(
    cleaned: string,
    isCommaDecimal: boolean
  ): string {
    const hasComma = cleaned.includes(',');
    const hasDot = cleaned.includes('.');

    if (hasComma && hasDot) {
      return this.handleBothSeparators(cleaned);
    }

    if (hasComma) {
      return this.handleCommaSeparator(cleaned, isCommaDecimal);
    }

    if (hasDot) {
      return this.handleDotSeparator(cleaned, isCommaDecimal);
    }

    return cleaned;
  }

  private static parseInputToCents(input: string, locale: string): number {
    const cleaned = this.cleanNumericInput(input);

    if (!cleaned) {
      throw new ProductValidationError('price', 'Preço inválido');
    }

    const isCommaDecimal = this.isCommaDecimalLocale(locale);
    const normalized = this.normalizeDecimalSeparator(cleaned, isCommaDecimal);
    const parsed = Number(normalized);

    this.validateValue(parsed);

    return Math.round(parsed * 100);
  }
}
