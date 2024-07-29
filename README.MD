# FLATED REACT
`flated-react` is a react libary that used to Flatten nested React components and remove React context hells
## Build Status


[![All Testing](https://github.com/cute-me-on-repos/flated-react/actions/workflows/run-test.yml/badge.svg 'All Testing')](https://github.com/cute-me-on-repos/flated-react/actions?query=workflow:%22Run+Tests%22)
<br/>
[![NPM Publication](https://github.com/cute-me-on-repos/flated-react/actions/workflows/npm-publish.yml/badge.svg 'NPM Publication')](https://npmjs.com/package/@cute-me-on-repo/flated-react)


## Install

```bash
npm install --save @cute-me-on-repo/flated-react
pnpm install @cute-me-on-repo/flated-react
yarn add @cute-me-on-repo/flated-react

```

## Usage

Giving an example react components/context hell:


```tsx
// {...deps imports}

export default function ReactComponent({children}:{ children: ReactNode }){
    const session = getExampleServerSesion()

    return (
        <>
            <TooltipProvider>
                <AuthProvider session={session}>
                    <IntercomProvider>
                        <EmailVerificationProvider>
                            <ThemeProvider
                                attribute='class'
                                defaultTheme='dark'
                                enableSystem
                            >
                                {children}
                            </ThemeProvider>
                        </EmailVerificationProvider>
                    </IntercomProvider>
                </AuthProvider>
            </TooltipProvider>
        </>
    )
}
```

Update the code using `flated-react`:
### Import `flated-react`
```tsx
import FlatedReact from "@cute-me-on-repo/flated-react";
```
### Update the `hell`
```tsx
// {...deps imports}

export default function ReactComponent({children}:{ children: ReactNode }){
    const session = getExampleServerSesion()

    return (
        <FlatedReact.Wrap
          components={[
            FlatedReact.Load(TooltipProvider),
            FlatedReact.Load(AuthProvider, { session }),
            FlatedReact.Load(IntercomProvider),
            FlatedReact.Load(EmailVerificationProvider),
            FlatedReact.Load(ThemeProvider, {
              attribute: 'class',
              defaultTheme: 'dark',
              enableSystem: true,
            }),
          ]}
        >
          {children}
        </FlatedReact.Wrap>
    )
}
```
## Notes
`FlatedReact.Load` is for component props type checking only, it is not neccessary in js, you can use the following code but we will not recommend it:

```tsx
import FlatedReact from "@cute-me-on-repo/flated-react";
// {...deps imports}

export default function ReactComponent({children}:{ children: ReactNode }){
    const session = getExampleServerSesion()

    return (
        <FlatedReact.Wrap
          components={[
            TooltipProvider,
            [AuthProvider, { session })],
            IntercomProvider,
            EmailVerificationProvider,
            [ThemeProvider, {
              attribute: 'class',
              defaultTheme: 'dark',
              enableSystem: true,
            }],
          ]}
        >
          {children}
        </FlatedReact.Wrap>
    )
}
