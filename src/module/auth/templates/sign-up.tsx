import Input from "@module/common/custom-input"

export default function SIGNUP() {
    return (
        <>
            <Input
                label="First name"
                name="first_name"
                required
                autoComplete="given-name"
            />
            <Input
                label="Last name"
                name="last_name"
                required
                autoComplete="family-name"
            />
            <Input
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
            />
            <Input
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
            />
            <Input
                label="Password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
            />
        </>
    )
}