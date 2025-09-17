// Stripe is disabled in this project. Provide stubs to avoid build errors.
export const stripe = undefined

export const getStripeCustomer = async (_email: string, _name?: string) => {
  throw new Error('Stripe is disabled')
}
