from machine import Pin, ADC
import utime

# Initialize ADC for GP26 (ADC0)
adc = ADC(26)

# Initialize GP10, GP11, GP12 as output pins
gp10 = Pin(10, Pin.OUT)
gp11 = Pin(11, Pin.OUT)
gp12 = Pin(12, Pin.OUT)


def adc_to_3bit(adc_value):
    # Convert 12-bit ADC value (0-4095) to 3-bit value (0-7)
    # Divide by 512 to map to 8 segments since 4096 / 8 = 512
    return adc_value // 512


while True:
    # Read ADC value
    value = adc.read_u16() >> 4  # Convert to 12-bit value
    # Convert to 3-bit
    bit_value = adc_to_3bit(value)

    # Update GPIO pins based on the 3-bit value
    gp10.value(bit_value & 0b001)
    gp11.value(bit_value & 0b010)
    gp12.value(bit_value & 0b100)

    # For debugging, print the ADC value and 3-bit value
    print("ADC Value:", value, "3-bit Value:", bit_value)

    # Wait a little before reading again
    utime.sleep(0.5)
