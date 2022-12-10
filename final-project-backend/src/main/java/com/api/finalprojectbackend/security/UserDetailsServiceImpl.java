package com.api.finalprojectbackend.security;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EmployeeEntity employeeEntity = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Employee Not Found with username: " + username));

        return UserDetailsImpl.build(employeeEntity);
    }
}
