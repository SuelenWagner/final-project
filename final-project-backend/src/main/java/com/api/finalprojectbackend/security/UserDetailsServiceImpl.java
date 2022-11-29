package com.api.finalprojectbackend.security;

import com.api.finalprojectbackend.entities.EmployeeEntity;
import com.api.finalprojectbackend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    //public UserDetailsServiceImpl(EmployeeRepository employeeRepository) {
    //     this.employeeRepository = employeeRepository;
    // }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //busca o user na base de dados

        /*EmployeeEntity employeeEntity = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Employee not found with username: " + username));
        return new User(employeeEntity.getUsername(), employeeEntity.getPassword(), true, true,
                true, true, employeeEntity.getAuthorities());*/

        EmployeeEntity employeeEntity = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Employee not found with username: " + username));
        return new User(employeeEntity.getUsername(), employeeEntity.getPassword(), new ArrayList<>());
    }
}
