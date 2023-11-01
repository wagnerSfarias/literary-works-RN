import { Text, TextInput, TextInputProps } from "react-native"

interface Props extends TextInputProps {
    label: string
    error: string
}

export function Input({ label, error, ...rest }: Props) {
    return (
        <>
            <Text className='text-xl mt-10  text-[#263238]'>{label}</Text>
            <TextInput
                {...rest}
                className={`h-11 border-b-2 ${error ? 'border-[#eb4545]' : 'border-[#263238]'} pl-2 text-lg `}
            />
            <Text className="text-[#eb4545] font-medium text-base">{error}</Text>
        </>
    )
}