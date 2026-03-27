import re

with open('components/ProductShowcase.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

old = (
    "<button className={`w-full sm:w-auto px-6 py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest "
    "transition-transform hover:scale-105 active:scale-95 shadow-lg ${prod.id === 'classic' ? 'bg-[#C7432A] "
    "text-white hover:bg-black' : 'bg-[#1F4E33] text-white hover:bg-mango'}`}>\n"
    "                        Ordenar Ahora\n"
    "                      </button>"
)
new = (
    '<a\n'
    '                        href={prod.id === \'classic\' ? STRIPE_LINK_CLASSIC : STRIPE_LINK_TROPICAL}\n'
    '                        target="_blank"\n'
    '                        rel="noopener noreferrer"\n'
    '                        className={`w-full sm:w-auto text-center px-6 py-3 md:py-4 rounded-xl font-bold uppercase tracking-widest '
    "transition-transform hover:scale-105 active:scale-95 shadow-lg ${prod.id === 'classic' ? 'bg-[#C7432A] "
    "text-white hover:bg-black' : 'bg-[#1F4E33] text-white hover:bg-mango'}`}\n"
    '                      >\n'
    '                        Ordenar Ahora\n'
    '                      </a>'
)

if old in content:
    content = content.replace(old, new)
    with open('components/ProductShowcase.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS')
else:
    print('NOT FOUND - checking normalize')
    # normalize line endings
    content_lf = content.replace('\r\n', '\n')
    old_lf = old.replace('\r\n', '\n')
    if old_lf in content_lf:
        content_lf = content_lf.replace(old_lf, new)
        with open('components/ProductShowcase.tsx', 'w', encoding='utf-8') as f:
            f.write(content_lf)
        print('SUCCESS (LF)')
    else:
        print('STILL NOT FOUND')
        # find lines around "Ordenar Ahora"
        for i, line in enumerate(content.splitlines()):
            if 'Ordenar' in line or 'button' in line.lower():
                print(f'L{i}: {repr(line)}')
