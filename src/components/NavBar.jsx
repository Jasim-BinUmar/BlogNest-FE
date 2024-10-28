import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { icons } from '../constants'
const navigation = [
  { name: 'Home', href: '', current: true },
  { name: 'Blogs', href: '', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const NavBar = ({currentPage}) => {
    const navigate = useNavigate()
    const signout=()=>{
      localStorage.removeItem('token');
      navigate('/signin')
    }
    if(currentPage === 'homePage'){
        navigation[0].current = true;
        navigation[1].current = false;
    }
    else if(currentPage === 'blogsPage'){
        navigation[0].current = false;
        navigation[1].current = true;
    }
    else if(currentPage === 'myblogs'){
        navigation[0].current = false;
        navigation[1].current = false;
    }

    const submit = async (itemName) => {
        if(itemName === 'Home'){
            navigation[0].href = '/homePage';
            return navigate('/homePage');

    
        }
        else if(itemName === 'Blogs'){
            navigation[1].href = '/blogs';
            return navigate('/blogs');
        }
        else if(itemName === 'myBlogs'){
            return navigate(`/myblogs`);
        }
    }
  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-blue to-lightBlue">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          {/* Mobile menu button*/}
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-yellow hover:bg-blue hover:text-yellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
          </DisclosureButton>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center ">
            <p className='text-yellow text-4xl font-bold font-mono'>BlogNest</p>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  onClick={() => submit(item.name)}
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current ? 'bg-yellow text-blue' : 'text-primary hover:bg-orange hover:text-blue',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          
          </div>
          
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/*<button
            type="button"
            className="relative rounded-full bg-blue p-1 text-yellow hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-orange"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              <MenuButton className="relative flex rounded-full bg-blue text-sm focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-blue">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  alt="BlogNest Profile"
                  src={icons.profile}
                  className="h-8 w-8 rounded-full object-contain"
                />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5  "
            >
              <MenuItem>
                <a onClick={() => submit('myBlogs')} href ="" className="block px-4 py-2 text-sm text-orange data-[focus]:bg-blue">
                  My Blogs
                </a>
              </MenuItem>
              <MenuItem>

                <a onClick={signout} href="" className="block px-4 py-2 text-sm text-orange data-[focus]:bg-blue">
                  Sign out
                </a>
              </MenuItem>
              {/*<MenuItem>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Sign out
                </a>
              </MenuItem>*/}
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as="a"
            onClick={() => submit(item.name)}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className={classNames(
              item.current ? 'bg-blue text-primary' : 'text-gray-300 hover:bg-blue hover:text-orange',
              'block rounded-md px-3 py-2 text-base font-medium',
            )}
          >
            {item.name}
          </DisclosureButton>
        ))}
      </div>
    </DisclosurePanel>
  </Disclosure>
  );
}

export default NavBar