'use client';

import { useActionState } from 'react';
import { Button } from '@ivc-inha/ui';
import { Input } from '@ivc-inha/ui';
import { Label } from '@ivc-inha/ui';
import { CircleIcon, Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

export default function Login() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    signIn,
    { error: '' },
  );

  const [stateSignUp, formActionSignUp, pendingSignUp] = useActionState<ActionState, FormData>(
    signUp,
    { error: '' },
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CircleIcon className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            {"Login"}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action={formAction}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              {"Email"}
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              {"Password"}
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-red-500 text-sm">{state.message}</div>
          )}

          <div>
            <Button
              type="submit"
              name="provider"
              value="credentials"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-foreground hover:bg-foreground-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>


        <form action={formActionSignUp}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={stateSignUp.email}
            required
            maxLength={100}
            className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Enter your email"
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            defaultValue={stateSignUp.password}
            required
            maxLength={100}
            className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-muted-foreground text-foreground focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Enter your password"
          />
          <Button type="submit">Signup</Button>
        </form>
      </div>
    </div>
  );
}
