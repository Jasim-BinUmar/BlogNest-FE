import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'

const DropdownMenu = ({ menuItems, selectedCategory }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue px-3 py-2 text-sm font-semibold text-yellow shadow-lg ring-1 ring-inset ring-yellow hover:bg-orange hover:text-blue">
          {selectedCategory || 'Categories'}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-blue shadow-lg ring-1 ring-blue ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault()
                    item.handleClick(item.name)
                  }}
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-orange text-blue' : 'text-yellow'
                  }`}
                >
                  {item.name}
                </a>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default DropdownMenu