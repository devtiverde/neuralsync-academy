import * as PhosphorIcons from '@phosphor-icons/react'

/**
 * Thin wrapper around Phosphor Icons.
 * Props: name (PascalCase icon name), weight, size, color, className, style
 * Changing the underlying icon library only requires editing this file.
 */
export default function Icon({ name, weight = 'regular', size = 24, color, className, style }) {
  const Component = PhosphorIcons[name]
  if (!Component) {
    console.warn(`[Icon] Ícone "${name}" não encontrado no Phosphor Icons`)
    return <span style={{ width: size, height: size, display: 'inline-block' }} />
  }
  return <Component weight={weight} size={size} color={color} className={className} style={style} />
}
